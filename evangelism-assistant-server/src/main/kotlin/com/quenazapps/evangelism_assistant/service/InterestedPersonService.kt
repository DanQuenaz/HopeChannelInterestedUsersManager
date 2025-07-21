package com.quenazapps.evangelism_assistant.service

import com.quenazapps.evangelism_assistant.domain.DTO.InterestedPersonDTO
import com.quenazapps.evangelism_assistant.domain.InterestedPerson
import com.quenazapps.evangelism_assistant.repository.InterestedPersonRepository
import org.springframework.stereotype.Service
import java.util.Optional

@Service
class InterestedPersonService(private val repository: InterestedPersonRepository) {

    fun findAll(): List<InterestedPerson> = repository.findAll()

    fun findAllDTOs(): List<InterestedPersonDTO> {
        return repository.findAll().map { it.toDTO() }
    }

    fun findById(id: Int): Optional<InterestedPerson> = repository.findById(id)

    fun save(interestedPerson: InterestedPerson): InterestedPerson = repository.save(interestedPerson)

    fun deleteById(id: Int) = repository.deleteById(id)

    fun update(data: Map<String, Any>): InterestedPerson? {
        val id = data["id"]?.toString()?.toIntOrNull() ?: return null
        val person = repository.findById(id).orElse(null) ?: return null

        val newStatus = data["status"]?.toString()
        val newFormattedPhone = data["formattedPhoneNumber"]?.toString()

        val updatedPerson = person.copy(
            status = newStatus ?: person.status,
            formattedPhoneNumber = newFormattedPhone ?: person.formattedPhoneNumber
        )

        return repository.save(updatedPerson)
    }


}