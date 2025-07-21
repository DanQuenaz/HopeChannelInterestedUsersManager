package com.quenazapps.evangelism_assistant.repository

import com.quenazapps.evangelism_assistant.domain.InterestedPerson
import org.springframework.data.jpa.repository.JpaRepository

interface InterestedPersonRepository : JpaRepository<InterestedPerson, Int> {
}