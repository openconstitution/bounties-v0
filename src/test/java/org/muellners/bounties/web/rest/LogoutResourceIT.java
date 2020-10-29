package org.muellners.bounties.web.rest;

<<<<<<< HEAD
import static org.muellners.bounties.web.rest.TestUtil.ID_TOKEN;
import static org.muellners.bounties.web.rest.TestUtil.authenticationToken;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.Instant;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.muellners.bounties.BountiesApp;
import org.muellners.bounties.config.TestSecurityConfiguration;
=======
import org.muellners.bounties.BountiesApp;
import org.muellners.bounties.RedisTestContainerExtension;
import org.muellners.bounties.config.TestSecurityConfiguration;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
>>>>>>> Generated with JHipster 6.10.3
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

<<<<<<< HEAD
=======
import java.time.Instant;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import static org.muellners.bounties.web.rest.TestUtil.ID_TOKEN;
import static org.muellners.bounties.web.rest.TestUtil.authenticationToken;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

>>>>>>> Generated with JHipster 6.10.3
/**
 * Integration tests for the {@link LogoutResource} REST controller.
 */
@SpringBootTest(classes = {BountiesApp.class, TestSecurityConfiguration.class})
<<<<<<< HEAD
public class LogoutResourceIT {

  @Autowired private ClientRegistrationRepository registrations;

  @Autowired private WebApplicationContext context;

  private MockMvc restLogoutMockMvc;

  private OidcIdToken idToken;

  @BeforeEach
  public void before() throws Exception {
    Map<String, Object> claims = new HashMap<>();
    claims.put("groups", Collections.singletonList("ROLE_USER"));
    claims.put("sub", 123);
    this.idToken = new OidcIdToken(ID_TOKEN, Instant.now(),
                                   Instant.now().plusSeconds(60), claims);

    SecurityContextHolder.getContext().setAuthentication(
        authenticationToken(idToken));
    SecurityContextHolderAwareRequestFilter authInjector =
        new SecurityContextHolderAwareRequestFilter();
    authInjector.afterPropertiesSet();

    this.restLogoutMockMvc =
        MockMvcBuilders.webAppContextSetup(this.context).build();
  }

  @Test
  public void getLogoutInformation() throws Exception {
    String logoutUrl = this.registrations.findByRegistrationId("oidc")
                           .getProviderDetails()
                           .getConfigurationMetadata()
                           .get("end_session_endpoint")
                           .toString();
    restLogoutMockMvc.perform(post("/api/logout"))
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
        .andExpect(jsonPath("$.logoutUrl").value(logoutUrl))
        .andExpect(jsonPath("$.idToken").value(ID_TOKEN));
  }
=======
@ExtendWith(RedisTestContainerExtension.class)
public class LogoutResourceIT {

    @Autowired
    private ClientRegistrationRepository registrations;

    @Autowired
    private WebApplicationContext context;

    private MockMvc restLogoutMockMvc;

    private OidcIdToken idToken;

    @BeforeEach
    public void before() throws Exception {
        Map<String, Object> claims = new HashMap<>();
        claims.put("groups", Collections.singletonList("ROLE_USER"));
        claims.put("sub", 123);
        this.idToken = new OidcIdToken(ID_TOKEN, Instant.now(), Instant.now().plusSeconds(60), claims);

        SecurityContextHolder.getContext().setAuthentication(authenticationToken(idToken));
        SecurityContextHolderAwareRequestFilter authInjector = new SecurityContextHolderAwareRequestFilter();
        authInjector.afterPropertiesSet();

        this.restLogoutMockMvc = MockMvcBuilders.webAppContextSetup(this.context).build();
    }

    @Test
    public void getLogoutInformation() throws Exception {
        String logoutUrl = this.registrations.findByRegistrationId("oidc").getProviderDetails()
            .getConfigurationMetadata().get("end_session_endpoint").toString();
        restLogoutMockMvc.perform(post("/api/logout"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.logoutUrl").value(logoutUrl))
            .andExpect(jsonPath("$.idToken").value(ID_TOKEN));
    }
>>>>>>> Generated with JHipster 6.10.3
}
