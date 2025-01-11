package com.epam.rd.autotasks.sprintplanning.tickets;

public class UserStory extends Ticket {
    private UserStory[] dependsOn;

    public UserStory(int id, String name, int estimate, UserStory... dependsOn) {
        super(id, name, estimate);

        this.dependsOn = dependsOn;
    }

    @Override
    public void complete() {
        for(UserStory e: dependsOn)
        {
            if(e.isCompleted()==false) return;
        }
        super.complete();
    }

    public UserStory[] getDependencies() {
        return dependsOn.clone(); //клонує об'єкт і надає доступ лишень до його копії
    }



    //[US 1] User Story 1
    @Override
    public String toString() {
        return "[US "+getId()+"] "+getName();
    }
}
