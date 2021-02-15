package org.muellners.bounties.exceptions;

public class NoBenefactorException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public NoBenefactorException(Long bountyId) {
		super("The benefactor for bounty " + bountyId.toString() + " was not found.");
	}
}
