package com.quenazapps.evangelism_assistant.repository

import com.quenazapps.evangelism_assistant.domain.Responsible
import org.springframework.data.jpa.repository.JpaRepository

interface ResponsibleRepository: JpaRepository<Responsible, Int> {
}