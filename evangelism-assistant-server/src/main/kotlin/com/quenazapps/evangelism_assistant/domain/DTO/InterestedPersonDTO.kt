package com.quenazapps.evangelism_assistant.domain.DTO

import java.time.LocalDate

data class InterestedPersonDTO(
    val id: Int,
    val referenceId: String,
    val name: String,
    val phoneNumber: String,
    val formattedPhoneNumber: String? = null,
    val courseOrdered: String? = null,
    val orderDate: LocalDate? = null,
    val address: String? = null,
    val status: String? = null,
    val lastStatusUpdate: LocalDate? = null,
    val responsible: String? = null
)
