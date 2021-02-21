package org.muellners.bounties.security.oauth2;

import org.muellners.bounties.config.Constants;
import org.muellners.bounties.domain.User;
import org.muellners.bounties.repository.UserRepository;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.Optional;

@Service
public class OAuth2UserServiceCustom extends DefaultOAuth2UserService {

	final UserRepository userRepository;

	public OAuth2UserServiceCustom(final UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2User oAuth2User = super.loadUser(userRequest);

		User user;

		try {
			final Map<String, Object> attributes = oAuth2User.getAttributes();

			Optional<User> optUser = userRepository.findOneByLogin((String) attributes.get("login"));
			if (optUser.isPresent()) {
				user = setUserAttr(optUser.get(), attributes);
			} else {
				user = setUserAttr(new User(), attributes);
			}

			userRepository.save(user);
			return oAuth2User;

		} catch (AuthenticationException ex) {
			throw ex;
		} catch (Exception ex) {
			// Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
			throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
		}
	}

	public static User setUserAttr(final User user, final Map<String, Object> attr) {
		if (attr.get("id") != null) {
			user.setId(Long.valueOf((Integer) attr.get("id")));
		}

		user.setLogin((String) attr.get("login"));
		user.setName((String) attr.get("name"));
		user.setEmail(((String) attr.get("email")).toLowerCase());
		user.setImageUrl((String) attr.get("avatar_url"));

		if (attr.get("html_url") != null) {
			user.setGithubProfileUrl((String) attr.get("html_url"));
		}
		if (attr.get("created_at") != null) {
			user.setCreatedDate(Instant.parse((String) attr.get("created_at")));
		}
		if (attr.get("updated_at") != null) {
			user.setLastModifiedDate(Instant.parse((String) attr.get("updated_at")));
		}

		if (attr.get("langKey") != null) {
			user.setLangKey((String) attr.get("langKey"));
		} else if (attr.get("locale") != null) {
			// trim off country code if it exists
			String locale = (String) attr.get("locale");
			if (locale.contains("_")) {
				locale = locale.substring(0, locale.indexOf('_'));
			} else if (locale.contains("-")) {
				locale = locale.substring(0, locale.indexOf('-'));
			}
			user.setLangKey(locale.toLowerCase());
		} else {
			// set langKey to default if not specified by IdP
			user.setLangKey(Constants.DEFAULT_LANGUAGE);
		}

		return user;
	}

}
