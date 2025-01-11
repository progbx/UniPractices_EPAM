package com.epam.rd.autotasks.sprintplanning;

import com.epam.rd.autotasks.sprintplanning.tickets.Bug;
import com.epam.rd.autotasks.sprintplanning.tickets.Ticket;
import com.epam.rd.autotasks.sprintplanning.tickets.UserStory;

public class Sprint {

    private int maxEstimateCapacity;
    private int currentEstimateCapacity;
    private int ticketsLimit;
    private Ticket[] tickets;
    private int currentTickets = 0;

    public Sprint(int maxEstimateCapacity, int ticketsLimit) {
        this.maxEstimateCapacity = maxEstimateCapacity;
        this.ticketsLimit = ticketsLimit;
        tickets = new Ticket[ticketsLimit];
    }

    public boolean addUserStory(UserStory userStory) {
        if(userStory != null
                && isUserStoryDependenciesInSprint(userStory.getDependencies())
        ) return addTicket(userStory);
        else return false;
    }

    public boolean isUserStoryDependenciesInSprint(UserStory[] dependencies) {
        int counter = 0;
        for(int i = 0; i < dependencies.length; i++)
        {
            for(int a = 0; a < currentTickets; a++)
                if(tickets[a] == dependencies[i]) counter++;
        }
        if(counter == dependencies.length) return true;
        else return false;
    }

    public boolean addBug(Bug bugReport) {
        return addTicket(bugReport);
    }

    private boolean addTicket(Ticket ticket)
    {

        if(ticket == null || ticket.isCompleted()) return false;
        if(currentTickets == ticketsLimit)  return false;

        currentEstimateCapacity += ticket.getEstimate();
        if(currentEstimateCapacity > maxEstimateCapacity){
            currentEstimateCapacity -= ticket.getEstimate();
            return false;
        }

        tickets[currentTickets] = ticket;
        currentTickets++;
        return true;
    }
    public Ticket[] getTickets() {

        Ticket[] temp = tickets.clone();
        Ticket[] temp2 = new Ticket[currentTickets];

        for(int i = 0; i < currentTickets; i++) temp2[i] = temp[i];
        return temp2;
    }

    public int getTotalEstimate() {
        return currentEstimateCapacity;
    }
}