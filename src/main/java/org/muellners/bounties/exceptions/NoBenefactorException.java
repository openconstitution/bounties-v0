package org.muellners.bounties.exceptions;

public class NoBenefactorException extends RuntimeException{
	public NoBenefactorException(Long bountyId) {
		super("The benefactor for bounty " + bountyId.toString() + " was not found.");
	}
}
