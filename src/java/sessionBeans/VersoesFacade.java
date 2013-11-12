/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package sessionBeans;

import entities.Versoes;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author manuel.jara
 */
@Stateless
public class VersoesFacade extends AbstractFacade<Versoes> {
    @PersistenceContext(unitName = "WebApplication10PU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public VersoesFacade() {
        super(Versoes.class);
    }
    
}
