 package org.muellners.bounties.config;

 import org.muellners.bounties.BountiesApp;
 import org.slf4j.Logger;
 import org.slf4j.LoggerFactory;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.boot.CommandLineRunner;
 import org.springframework.context.annotation.Bean;
 import org.springframework.context.annotation.Configuration;
 import org.springframework.core.env.Environment;
 import org.springframework.http.MediaType;
 import org.springframework.web.reactive.function.client.WebClient;
 import org.springframework.web.reactive.function.client.WebClientResponseException;
 import reactor.core.publisher.Flux;
 import reactor.core.publisher.Mono;

 @Configuration
 public class JiraListener {

 	@Autowired private Environment environment;

 	@SuppressWarnings("unused")
 	private static final Logger log = LoggerFactory.getLogger(BountiesApp.class);

 	@Bean
 	WebClient getWebClient() {
 		return WebClient.create(getClientAddress());
 	}

 	@Bean
 	CommandLineRunner listen(WebClient web) {
	    WebClient.ResponseSpec response = web.get()
			    .uri(getUri())
			    .accept(MediaType.TEXT_EVENT_STREAM)
			    .retrieve()
			    .onStatus(
		            httpStatus -> {
				        if (httpStatus.is4xxClientError()) {
				            log.debug("Something went wrong with reading from {}", getClientAddress());
				            return true;
					    } else if (httpStatus.is5xxServerError()) {
				            log.debug("Server error from publisher {}", getClientAddress());
				            return true;
					    } else {
				        	return false;
				        }
			        },
				    clientResponse -> Mono.empty()
			    );

	    Flux<Object> bodyToFlux = response.bodyToFlux(String.class).map(String::valueOf);
	    log.debug("Response from listener: {}", bodyToFlux);

	    return args -> response
			    .bodyToFlux(String.class)
			    .onErrorResume(WebClientResponseException.class,
					    ex -> ex.getRawStatusCode() == 404 ? Mono.empty() : Mono.error(ex))
			    .map(String::valueOf)
			    .subscribe(log::debug);

 	}

 	private String getClientAddress() {
 		return environment.getProperty("application.listeners.url");
 	}

 	private String getUri() {
 		return environment.getProperty("application.listeners.path");
 	}
 }
