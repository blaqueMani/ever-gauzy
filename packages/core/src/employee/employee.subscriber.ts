import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import { retrieveNameFromEmail } from "@leano/common";
import { Employee } from "./employee.entity";
import { generateSlug, getUserDummyImage } from "./../core/utils";

@EventSubscriber()
export class EmployeeSubscriber implements EntitySubscriberInterface<Employee> {

    /**
    * Indicates that this subscriber only listen to Employee events.
    */
    listenTo() {
        return Employee;
    }

    /**
    * Called after entity is loaded.
    */
    afterLoad(entity: Employee) {
        if (entity.user) {
            entity.fullName = entity.user.name;
        }
    }

    /**
     * Called before employee insertion.
     */
    beforeInsert(event: InsertEvent<Employee>) {
        if (event.entity) {
            const { entity } = event;
            /**
             * Use a dummy image avatar if no image is uploaded for any of the employee
             */
            if (entity.user) {
                if (!entity.user.imageUrl) {
                    entity.user.imageUrl = getUserDummyImage(entity.user)
                }
                this.createSlug(entity);
            }
        }
    }

    /**
     * Generate employee public profile slug
     */
    createSlug(entity: Employee) {
        if (entity.user.firstName || entity.user.lastName) { // Use first & last name to create slug
            const { firstName, lastName } = entity.user;
            entity.profile_link = generateSlug(`${firstName} ${lastName}`);
        } else if (entity.user.username) { // Use username to create slug if first & last name not found
            const { username } = entity.user;
            entity.profile_link = generateSlug(`${username}`);
        } else { // Use email to create slug if nothing found
            const { email } = entity.user;
            entity.profile_link = generateSlug(`${retrieveNameFromEmail(email)}`);
        }
    }
}