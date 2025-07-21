package com.quenazapps.evangelism_assistant.domain

import jakarta.persistence.CascadeType
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.OneToMany
import jakarta.persistence.Table

@Entity
@Table(name = "responsible")
data class Responsible(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int = 0,

    @Column(nullable = false)
    val name: String,

    @Column(nullable = false)
    val phoneNumber: String,

    val formattedPhoneNumber: String? = null,

    @OneToMany(mappedBy = "responsible", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    val interestedPeople: List<InterestedPerson> = emptyList()
)