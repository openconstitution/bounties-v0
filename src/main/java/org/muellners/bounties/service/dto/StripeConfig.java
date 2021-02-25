package org.muellners.bounties.service.dto;

import org.springframework.beans.factory.annotation.Value;
import java.util.List;
import java.util.Optional;

public class StripeConfig {
    public String stripePublishableKey;

    public String stripeCountry;

    public String country;

    public String currency;

    @Value("${application.stripe.paymentMethods}")
    public List<String> paymentMethods;

    public StripeConfig(final String stripePublishableKey, final String stripeCountry) {
        this.stripePublishableKey = stripePublishableKey;
        this.stripeCountry = Optional.ofNullable(stripeCountry).orElse("US");
        this.country = "US";
        this.currency = "eur";
    }
}
