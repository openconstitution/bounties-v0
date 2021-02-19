package org.muellners.bounties.service;

import org.muellners.bounties.config.Constants;
import org.muellners.bounties.domain.Authority;
import org.muellners.bounties.domain.User;
import org.muellners.bounties.repository.AuthorityRepository;
import org.muellners.bounties.repository.UserRepository;
import org.muellners.bounties.security.SecurityUtils;
import org.muellners.bounties.security.oauth2.OAuth2UserServiceCustom;
import org.muellners.bounties.service.dto.UserDTO;
import org.muellners.bounties.service.mapper.UserMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class UserService {

	private final Logger log = LoggerFactory.getLogger(UserService.class);

	private final UserMapper userMapper;
	private final UserRepository userRepository;
	private final AuthorityRepository authorityRepository;
	private final CacheManager cacheManager;

	public UserService(UserMapper userMapper, UserRepository userRepository,
	                   AuthorityRepository authorityRepository, CacheManager cacheManager) {
		this.userMapper = userMapper;
		this.userRepository = userRepository;
		this.authorityRepository = authorityRepository;
		this.cacheManager = cacheManager;
	}

//	/**
//	 * Update basic information (first name, last name, email, language) for the current user.
//	 *
//	 * @param firstName first name of user.
//	 * @param lastName  last name of user.
//	 * @param email     email id of user.
//	 * @param langKey   language key.
//	 * @param imageUrl  image URL of user.
//	 */
//	public void updateUser(String firstName, String lastName, String email, String langKey, String imageUrl) {
//		SecurityUtils.getCurrentUserLogin()
//				.flatMap(userRepository::findOneByLogin)
//				.ifPresent(user -> {
//					user.setFirstName(firstName);
//					user.setLastName(lastName);
//					if (email != null) {
//						user.setEmail(email.toLowerCase());
//					}
//					user.setLangKey(langKey);
//					user.setImageUrl(imageUrl);
//					this.clearUserCaches(user);
//					log.debug("Changed Information for User: {}", user);
//				});
//	}

	/**
	 * Update user account, add/update profile details.
	 *
	 * @param userDTO ususer details
	 */
	public UserDTO updateUserAccount(UserDTO userDTO) {
		log.debug("Request to save User : {}", userDTO);
		final User user = userMapper.toEntity(userDTO);
		userRepository.save(user);
		this.clearUserCaches(user);
		log.debug("Updated profile for User: {}", user);
		return userMapper.toDto(user);
	}

	@Transactional(readOnly = true)
	public Page<UserDTO> getAllManagedUsers(Pageable pageable) {
		return userRepository.findAllByLoginNot(pageable, Constants.ANONYMOUS_USER).map(UserDTO::new);
	}

	@Transactional(readOnly = true)
	public Optional<User> getUserWithAuthoritiesByLogin(String login) {
		return userRepository.findOneWithAuthoritiesByLogin(login);
	}

	/**
	 * Gets a list of all the authorities.
	 * @return a list of all the authorities.
	 */
	@Transactional(readOnly = true)
	public List<String> getAuthorities() {
		return authorityRepository.findAll().stream().map(Authority::getName).collect(Collectors.toList());
	}

	/**
	 * Returns the user from an OAuth 2.0 login or resource server with JWT.
	 * Synchronizes the user in the local repository.
	 *
	 * @param authToken the authentication token.
	 * @return the user from the authentication.
	 */
	@Transactional
	public UserDTO getUserFromAuthentication(AbstractAuthenticationToken authToken) {
		User user;
		Map<String, Object> attributes;

		if (authToken instanceof OAuth2AuthenticationToken) {
			attributes = ((OAuth2AuthenticationToken) authToken).getPrincipal().getAttributes();
		} else if (authToken instanceof JwtAuthenticationToken) {
			attributes = ((JwtAuthenticationToken) authToken).getTokenAttributes();
		} else {
			throw new IllegalArgumentException("AuthenticationToken is not OAuth2 or JWT!");
		}

		Optional<User> optUser = userRepository.findOneByLogin((String) attributes.get("login"));
		if (optUser.isPresent()) {
			user = OAuth2UserServiceCustom.setUserAttr(optUser.get(), attributes);
		} else {
			user = OAuth2UserServiceCustom.setUserAttr(new User(), attributes);
		}

		userRepository.save(user);

		user.setAuthorities(authToken.getAuthorities().stream()
				.map(GrantedAuthority::getAuthority)
				.map(authority -> {
					Authority auth = new Authority();
					auth.setName(authority);
					return auth;
				})
				.collect(Collectors.toSet()));
		return new UserDTO(user);
	}

	private void clearUserCaches(User user) {
		Objects.requireNonNull(cacheManager.getCache(UserRepository.USERS_BY_LOGIN_CACHE)).evict(user.getLogin());
		if (user.getEmail() != null) {
			Objects.requireNonNull(cacheManager.getCache(UserRepository.USERS_BY_EMAIL_CACHE)).evict(user.getEmail());
		}
	}
}
