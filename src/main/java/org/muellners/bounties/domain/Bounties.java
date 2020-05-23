package org.muellners.bounties.domain;

import com.sun.istack.NotNull;
import net.minidev.json.annotate.JsonIgnore;
import org.muellners.bounties.enums.BountiesStatus;
import org.springframework.data.elasticsearch.annotations.FieldType;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.math.BigDecimal;

/**
 * Bounties
 */

@Entity
@Table(name = "jhi_bounties")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "bounties")
public class Bounties extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private String id;

    @NotNull
    @Size(max= 500)
    @Column(length = 500, nullable = false)
    private String title;

    @NotNull
    @Size(max=500)
    @Column(length = 500, nullable = false)
    private String url;

    @NotNull
    @Column(nullable = false)
    private BigDecimal amount;

    @NotNull
    @Column(nullable = false)
    private Enum<BountiesStatus> statusEnum;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "jhi_user")
    private User user;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Enum<BountiesStatus> getStatusEnum() {
        return statusEnum;
    }

    public void setStatusEnum(Enum<BountiesStatus> statusEnum) {
        this.statusEnum = statusEnum;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o){
            return true;
        }
        if (!(o instanceof Bounties)) {
            return false;
        }
        return id != null && id.equals(((Bounties) o).id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Bounties{" +
            "id='" + id + '\'' +
            ", title='" + title + '\'' +
            ", url='" + url + '\'' +
            ", amount=" + amount +
            ", statusEnum=" + statusEnum +
            ", user=" + user +
            '}';
    }
}
