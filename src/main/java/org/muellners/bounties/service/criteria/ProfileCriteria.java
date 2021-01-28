package org.muellners.bounties.service.criteria;

import io.github.jhipster.service.Criteria;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;

import java.io.Serializable;

/**
 * Criteria class for the [cm.pwork.schoolman.domain.Option] entity. This class is used in
 * [cm.pwork.schoolman.web.rest.OptionResource] to receive all the possible filtering options from the
 * Http GET request parameters.
 * For example the following could be a valid request:
 * ```/options?id.greaterThan=5&attr1.contains=something&attr2.specified=false```
 * As Spring is unable to properly convert the types, unless specific [Filter] class are used, we need to use
 * fix type specific filters.
 */
public class ProfileCriteria implements Serializable, Criteria {

	private static final long serialVersionUID = 1L;

	private LongFilter id;
	private IntegerFilter votes;
	private StringFilter profileLink;
	private StringFilter about;
	private StringFilter githubEmail;
	private StringFilter githubOrgName;

	public ProfileCriteria(final ProfileCriteria other) {
		other.id.copy();
		other.votes.copy();
		other.profileLink.copy();
		other.about.copy();
		other.githubEmail.copy();
		other.githubOrgName.copy();
	}

	public LongFilter getId() {
		return id;
	}

	public void setId(LongFilter id) {
		this.id = id;
	}

	public IntegerFilter getVotes() {
		return votes;
	}

	public void setVotes(IntegerFilter votes) {
		this.votes = votes;
	}

	public StringFilter getProfileLink() {
		return profileLink;
	}

	public void setProfileLink(StringFilter profileLink) {
		this.profileLink = profileLink;
	}

	public StringFilter getAbout() {
		return about;
	}

	public void setAbout(StringFilter about) {
		this.about = about;
	}

	public StringFilter getGithubEmail() {
		return githubEmail;
	}

	public void setGithubEmail(StringFilter githubEmail) {
		this.githubEmail = githubEmail;
	}

	public StringFilter getGithubOrgName() {
		return githubOrgName;
	}

	public void setGithubOrgName(StringFilter githubOrgName) {
		this.githubOrgName = githubOrgName;
	}

	@Override
	public Criteria copy() {
		return new ProfileCriteria(this);
	}
}
