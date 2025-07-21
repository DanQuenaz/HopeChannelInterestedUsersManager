package com.quenazapps.evangelism_assistant.service

import com.quenazapps.evangelism_assistant.domain.Responsible
import com.quenazapps.evangelism_assistant.repository.ResponsibleRepository
import org.springframework.stereotype.Service
import java.util.Optional


@Service
class ResponsibleService(private val repository: ResponsibleRepository) {

    fun findAll(): List<Responsible> = repository.findAll()

    fun findById(id: Int): Optional<Responsible> = repository.findById(id)

    fun save(responsible: Responsible): Responsible = repository.save(responsible)

    fun deleteById(id: Int) = repository.deleteById(id)
}