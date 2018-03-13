import { Actor } from 'serenity-js/protractor';
import {listOf} from "../../spec/text";
import {Start} from "../../screenplay/tasks/start";
import {AddATodoItem} from "../../screenplay/tasks/add_a_todo_item";
import {protractor} from "protractor";
import {BrowseTheWeb, Is, Wait} from "serenity-js/lib/serenity-protractor";
import {TodoList} from "../../screenplay/components/todo_list";
import {expect} from "../../spec/expect";

export = function todoUserSteps() {

    this.setDefaultTimeout(30 * 1000);  // The todomvc.com website can sometimes be a bit slow to load, so we tell

    let actor: Actor;                                    // Cucumber to give it up to 30 seconds to get ready.

    this.Given(/^.*that (.*) has a todo list containing (.*)$/, function (name: string, items: string) {

        actor = Actor.named(name).whoCan(BrowseTheWeb.using(protractor.browser));

        actor.attemptsTo(
            Start.withATodoListContaining(listOf(items))
        );


    });

    this.When(/^s?he adds (.*?) to (?:his|her) list$/, function (itemName: string) {
        return actor.attemptsTo(
            //AddATodoItem.called(itemName)
        )
    });

    this.Then(/^.* todo list should contain (.*?)$/, function (items: string) {
        return expect(actor.toSee(TodoList.Items_Displayed)).eventually.deep.equal(listOf(items));
    });
};
