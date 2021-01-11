package org.muellners.bounties.service.dto;

import org.muellners.bounties.domain.Option;

public class OptionDTO {

	private Long id;

	private String name;

	private String key;

	private String value;

	public OptionDTO() {
		//
	}

	public OptionDTO(final Option option) {
		this.id = option.getId();
		this.name = option.getName();
		this.key = option.getKey();
		this.value = option.getValue();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
}
