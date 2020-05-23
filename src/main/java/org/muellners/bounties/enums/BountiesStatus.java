package org.muellners.bounties.enums;

public enum BountiesStatus {
    /**
     * This is the status for bounties
     * Every Bounty first created as open , once funded
     * will be funded and then once funded will be closed assuming
     * the project maintainer will pay the contributor
     * and close the bounty
     */
    OPEN,
    CLOSED,
    FUNDED,
    

}
