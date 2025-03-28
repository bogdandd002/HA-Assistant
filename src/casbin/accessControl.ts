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
    p, Authenticated, contractors, show
    p, Authenticated, contractors, list
    p, Authenticated, contractors, create
    p, Authenticated, contractors, (list)|(edit)|(delete)

    p, Authenticated, contact-people, show
    p, Authenticated, contact-people, list
    p, Authenticated, contact-people, create
    p, Authenticated, contact-people, (list)|(edit)|(delete)
  
    p, editor, users, list
    p, editor, canvases, (list)|(edit)
  `);