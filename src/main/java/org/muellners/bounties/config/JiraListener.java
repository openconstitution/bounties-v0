package org.muellners.bounties.config;

import org.muellners.bounties.BountiesApp;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

@Configuration
public class JiraListener {

    @Autowired
    private Environment environment;

    private static final Logger log = LoggerFactory.getLogger(BountiesApp.class);

    @Bean
    WebClient getWebClient() {
        return WebClient.create(getClientAddress());
    }

    @Bean
    CommandLineRunner listen(WebClient web){
        return args -> {
            web.get()
                .uri(getUri())
                .accept(MediaType.TEXT_EVENT_STREAM)
                .retrieve()
                .bodyToFlux(String.class)
                .map(s -> String.valueOf(s))
                .subscribe(msg -> {
                    log.debug(msg);
                });
        };
    }

    private String getClientAddress() {
        return environment.getProperty("application.listeners.url");
    }

    private String getUri() {
        return environment.getProperty("application.listeners.path");
    }


}
