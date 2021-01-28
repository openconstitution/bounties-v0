package org.muellners.bounties.service.criteria;

import io.github.jhipster.service.Criteria;
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
public class OptionCriteria implements Serializable, Criteria {

	private static final long serialVersionUID = 1L;

	private LongFilter id;
	private StringFilter name;
	private StringFilter key;
	private StringFilter value;

	public OptionCriteria(final OptionCriteria option) {
		option.id.copy();
		option.name.copy();
		option.key.copy();
		option.value.copy();
	}

	public LongFilter getId() {
		return id;
	}

	public void setId(LongFilter id) {
		this.id = id;
	}

	public StringFilter getName() {
		return name;
	}

	public void setName(StringFilter name) {
		this.name = name;
	}

	public StringFilter getKey() {
		return key;
	}

	public void setKey(StringFilter key) {
		this.key = key;
	}

	public StringFilter getValue() {
		return value;
	}

	public void setValue(StringFilter value) {
		this.value = value;
	}

	@Override
	public Criteria copy() {
		return new OptionCriteria(this);
	}
}
