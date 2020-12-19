package org.muellners.bounties.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * Properties specific to Bounties.
 * <p>
 * Properties are configured in the {@code application.yml} file.
 * See {@link io.github.jhipster.config.JHipsterProperties} for a good example.
 */
@Configuration
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {

	private final Listeners listeners = new Listeners();

	private final Stripe stripe = new Stripe();

	public Listeners getListeners() { return listeners; }

	public Stripe getStripe() { return stripe; }

	private static class Listeners {
		private String url;

		private String path;

		public Listeners() {
			//
		}

		public String getUrl() { return url; }

		public void setUrl(String url) { this.url = url; }

		public String getPath() { return path; }

		public void setPath(String path) { this.path = path; }
	}

	private static class Stripe {
		private String publishableKey;
		private String apiKey;
		private String webhookSecret;
		private String accountCountry;
		private List<String> paymentMethods;

		public Stripe() {
			//
		}

		public String getPublishableKey() {
			return publishableKey;
		}

		public void setPublishableKey(String publishableKey) {
			this.publishableKey = publishableKey;
		}

		public String getApiKey() {
			return apiKey;
		}

		public void setApiKey(String apiKey) {
			this.apiKey = apiKey;
		}

		public String getWebhookSecret() {
			return webhookSecret;
		}

		public void setWebhookSecret(String webhookSecret) {
			this.webhookSecret = webhookSecret;
		}

		public String getAccountCountry() {
			return accountCountry;
		}

		public void setAccountCountry(String accountCountry) {
			this.accountCountry = accountCountry;
		}

		public List<String> getPaymentMethods() {
			return paymentMethods;
		}

		public void setPaymentMethods(List<String> paymentMethods) {
			this.paymentMethods = paymentMethods;
		}
	}
}
