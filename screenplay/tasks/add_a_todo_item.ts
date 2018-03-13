import { PerformsTasks, Task } from 'serenity-js/protractor';
import {protractor} from "protractor";
import {Enter} from "serenity-js/lib/serenity-protractor";
import {TodoList} from "../components/todo_list";

export class AddATodoItem implements Task {

    static called(itemName: string) {                       // static method to improve the readability
        return new AddATodoItem(itemName);
    }

    performAs(actor: PerformsTasks): PromiseLike<void> {    // required by the Task interface
        return actor.attemptsTo(                            // delegates the work to lower-level tasks
            Enter.theValue(this.itemName)                   // enter the value of the item name
                .into(TodoList.What_Needs_To_Be_Done)       // into a "What needs to be done" field
                .thenHit(protractor.Key.ENTER)              // then hit enter...
        );
    }

    constructor(private itemName: string) {                 // constructor assigning the name of the item
    }

// to a private field
}