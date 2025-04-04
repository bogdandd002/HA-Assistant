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
  
    p, editor, users, list
    p, editor, canvases, (list)|(edit)
  `);