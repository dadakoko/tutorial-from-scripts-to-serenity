import { Target } from 'serenity-js/protractor';
import { by } from 'protractor';

export class TodoList {
    static What_Needs_To_Be_Done = Target.the('"What needs to be done?" input box')
        .located(by.id('new-todo'));
}