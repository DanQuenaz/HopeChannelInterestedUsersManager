package com.quenazapps.evangelism_assistant.domain

import com.quenazapps.evangelism_assistant.domain.DTO.InterestedPersonDTO
import jakarta.persistence.CascadeType
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table
import java.time.LocalDate

@Entity
@Table(name = "interested_person")
data class InterestedPerson(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int = 0,

    @Column(nullable = false)
    val referenceId: String,

    @Column(nullable = false)
    val name: String,

    @Column(nullable = false)
    val phoneNumber: String,

    val formattedPhoneNumber: String? = null,

    val courseOrdered: String? = null,

    val orderDate: LocalDate? = null,

    val address: String? = null,

    val status: String? = null,

    val lastStatusUpdate: LocalDate? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "responsible_id")
    val responsible: Responsible? = null
){
    fun toDTO(): InterestedPersonDTO {
        return InterestedPersonDTO(
            id = this.id,
            name = this.name,
            phoneNumber = this.phoneNumber,
            formattedPhoneNumber = this.formattedPhoneNumber,
            status = this.status,
            referenceId = this.referenceId,
            courseOrdered = this.courseOrdered,
            orderDate = this.orderDate,
            address = this.address,
            lastStatusUpdate = this.lastStatusUpdate,
            responsible = this.responsible?.name,
        )
    }
}