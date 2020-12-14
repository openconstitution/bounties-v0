package org.muellners.bounties.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

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

		public String getUrl() { return url; }

		public void setUrl(String url) { this.url = url; }

		public String getPath() { return path; }

		public void setPath(String path) { this.path = path; }
	}

	private static class Stripe {
		private String publishableKey;
		private String secretKey;
		private String webhookSecret;
		private String accountCountry;
		private String paymentMethods;

		public String getPublishableKey() {
			return publishableKey;
		}

		public void setPublishableKey(String publishableKey) {
			this.publishableKey = publishableKey;
		}

		public String getSecretKey() {
			return secretKey;
		}

		public void setSecretKey(String secretKey) {
			this.secretKey = secretKey;
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

		public String getPaymentMethods() {
			return paymentMethods;
		}

		public void setPaymentMethods(String paymentMethods) {
			this.paymentMethods = paymentMethods;
		}
	}
}
