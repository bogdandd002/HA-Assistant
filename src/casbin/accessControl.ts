import { newModel, StringAdapter } from "casbin";

export const model = newModel(`
    [request_definition]
    r = sub, obj, act
  
    [policy_definition]
    p = sub, obj, act
  
    [role_definition]
    g = _, _
  
    [policy_effect]
    e = some(where (p.eft == allow))
  
    [matchers]
    m = g(r.sub, p.sub) && keyMatch(r.obj, p.obj) && regexMatch(r.act, p.act)
  `);
  
  export const adapter = new StringAdapter(`
    p, Admin, contractors, show
    p, Admin, contractors, list
    p, Admin, contractors, create
    p, Admin, contractors, (list)|(edit)|(delete)

    p, Admin, projects, show
    p, Admin, projects, list
    p, Admin, projects, create
    p, Admin, projects, (list)|(edit)|(delete)

    p, Admin, contact-people, show
    p, Admin, contact-people, list
    p, Admin, contact-people, create
    p, Admin, contact-people, (list)|(edit)|(delete)

    p, Admin, work-activities, show
    p, Admin, work-activities, list
    p, Admin, work-activities, create
    p, Admin, work-activities, (list)|(edit)|(delete)

    p, Admin, users, show
    p, Admin, users, list
    p, Admin, users, create
    p, Admin, users, (list)|(edit)|(delete)

    p, Contractor_super, projects, show
    p, Contractor_super, projects, list
    p, Contractor_super, projects, create
    p, Contractor_super, projects, (list)|(edit)|(delete)

    p, Contractor_super, contact-people, show
    p, Contractor_super, contact-people, list
    p, Contractor_super, contact-people, create
    p, Contractor_super, contact-people, (list)|(edit)|(delete)

    p, Contractor_super, work-activities, show
    p, Contractor_super, work-activities, list
    p, Contractor_super, work-activities, create
    p, Contractor_super, work-activities, (list)|(edit)|(delete)

    p, Contractor_super, users, show
    p, Contractor_super, users, list
    p, Contractor_super, users, create
    p, Contractor_super, users, (list)|(edit)|(delete)

    p, Contractor, projects, show
    p, Contractor, projects, list
    p, Contractor, projects, create
    p, Contractor, projects, (list)|(edit)|(delete)

    p, Contractor, contact-people, show
    p, Contractor, contact-people, list
    p, Contractor, contact-people, create
    p, Contractor, contact-people, (list)|(edit)|(delete)

    p, Contractor, work-activities, show
    p, Contractor, work-activities, list
    p, Contractor, work-activities, create
    p, Contractor, work-activities, (list)|(edit)|(delete)

    p, Contractor, users, show
    p, Contractor, users, list
    p, Contractor, users, create
    p, Contractor, users, (list)|(edit)|(delete)
  
    p, editor, users, list
    p, editor, canvases, (list)|(edit)
  `);