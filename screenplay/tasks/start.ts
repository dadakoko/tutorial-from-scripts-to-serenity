import { PerformsTasks, Task } from 'serenity-js/protractor';
import {AddATodoItem} from "./add_a_todo_item";
import {Is, Open, Wait} from "serenity-js/lib/serenity-protractor";
import {TodoList} from "../components/todo_list";

export class Start implements Task {

    static withATodoListContaining(items: string[]) {       // static method to improve the readability
        return new Start(items);
    }

    performAs(actor: PerformsTasks): PromiseLike<void> {    // required by the Task interface
        return actor.attemptsTo(
            Open.browserOn('/examples/angular2/'),
            Wait.until(TodoList.What_Needs_To_Be_Done, Is.clickable()),// delegates the work to lower-level tasks
            ...this.addAll(this.items)                          // ``...` is a spread operator,
        );
    }

    constructor(private items: string[]) {                  // constructor assigning the list of items
    }

    private addAll(items: string[]): Task[] {                   // transforms a list of item names
        return items.map(item => AddATodoItem.called(item));    // into a list of Tasks
    }
// to a private field
}