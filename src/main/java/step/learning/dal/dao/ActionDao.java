package step.learning.dal.dao;

import step.learning.dal.dto.ActionItem;

import java.util.UUID;

public class ActionDao {
    public ActionItem[] getAction(){
        return new ActionItem[] {
                new ActionItem(UUID.randomUUID(),UUID.randomUUID(), 1),
                new ActionItem(UUID.randomUUID(),UUID.randomUUID(), 2),
                new ActionItem(UUID.randomUUID(),UUID.randomUUID(), 3),
        };
    }
}
