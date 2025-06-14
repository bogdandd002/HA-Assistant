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

    p, Admin, dashboard, show
    p, Admin, dashboard, list
    p, Admin, dashboard, create
    p, Admin, dashboard, (list)|(edit)|(delete)

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

    p, Admin, sign-sheets, show
    p, Admin, sign-sheets, list
    p, Admin, sign-sheets, create
    p, Admin, sign-sheets, (list)|(edit)|(delete)

    p, Admin, users, show
    p, Admin, users, list
    p, Admin, users, create
    p, Admin, users, (list)|(edit)|(delete)

    p, Contractor_super, dashboard, show
    p, Contractor_super, dashboard, list
    p, Contractor_super, dashboard, create
    p, Contractor_super, dashboard, (list)|(edit)|(delete)

    p, Contractor_super, projects, show
    p, Contractor_super, projects, list
    p, Contractor_super, projects, create
    p, Contractor_super, projects, (list)|(edit)|(delete)

    p, Contractor_super, work-activities, show
    p, Contractor_super, work-activities, list
    p, Contractor_super, work-activities, create
    p, Contractor_super, work-activities, (list)|(edit)|(delete)

    p, Contractor_super, sign-sheets, show
    p, Contractor_super, sign-sheets, list
    p, Contractor_super, sign-sheets, create
    p, Contractor_super, sign-sheets, (list)|(edit)|(delete)

    p, Contractor, dashboard, show
    p, Contractor, dashboard, list
    p, Contractor, dashboard, create
    p, Contractor, dashboard, (list)|(edit)|(delete)
    
    p, Contractor_super, users, show
    p, Contractor_super, users, list
    p, Contractor_super, users, create
    p, Contractor_super, users, (list)|(edit)|(delete)

    p, Contractor, projects, show
    p, Contractor, projects, list
    p, Contractor, projects, (list)

    p, Contractor, work-activities, show
    p, Contractor, work-activities, list
    p, Contractor, work-activities, create
    p, Contractor, work-activities, (list)|(edit)|(delete)

    p, Main_contractor_super, contractors, show
    p, Main_contractor_super, contractors, list
    p, Main_contractor_super, contractors, create
    p, Main_contractor_super, contractors, (list)|(edit)|(delete)

    p, Main_contractor_super, dashboard, show
    p, Main_contractor_super, dashboard, list
    p, Main_contractor_super, dashboard, create
    p, Main_contractor_super, dashboard, (list)|(edit)|(delete)

    p, Main_contractor_super, projects, show
    p, Main_contractor_super, projects, list
    p, Main_contractor_super, projects, create
    p, Main_contractor_super, projects, (list)|(edit)|(delete)

    p, Main_contractor_super, contact-people, show
    p, Main_contractor_super, contact-people, list
    p, Main_contractor_super, contact-people, create
    p, Main_contractor_super, contact-people, (list)|(edit)|(delete)

    p, Main_contractor_super, work-activities, show
    p, Main_contractor_super, work-activities, list
    p, Main_contractor_super, work-activities, create
    p, Main_contractor_super, work-activities, (list)|(edit)|(delete)

    p, Main_contractor_super, sign-sheets, show
    p, Main_contractor_super, sign-sheets, list
    p, Main_contractor_super, sign-sheets, create
    p, Main_contractor_super, sign-sheets, (list)|(edit)|(delete)

    p, Main_contractor_super, users, show
    p, Main_contractor_super, users, list
    p, Main_contractor_super, users, create
    p, Main_contractor_super, users, (list)|(edit)|(delete)

    p, Main_contractor, contractors, show
    p, Main_contractor, contractors, list
    p, Main_contractor, contractors, (list)

    p, Main_contractor, dashboard, show
    p, Main_contractor, dashboard, list
    p, Main_contractor, dashboard, create
    p, Main_contractor, dashboard, (list)|(edit)|(delete)

    p, Main_contractor, projects, show
    p, Main_contractor, projects, list
    p, Main_contractor, projects, (list)

    p, Main_contractor, contact-people, show
    p, Main_contractor, contact-people, list
    p, Main_contractor, contact-people, create
    p, Main_contractor, contact-people, (list)|(edit)|(delete)

    p, Main_contractor, work-activities, show
    p, Main_contractor, work-activities, list
    p, Main_contractor, work-activities, create
    p, Main_contractor, work-activities, (list)|(edit)|(delete)

    p, Main_contractor, sign-sheets, show
    p, Main_contractor, sign-sheets, list
    p, Main_contractor, sign-sheets, create
    p, Main_contractor, sign-sheets, (list)|(edit)|(delete)

    p, Main_contractor, users, show
    p, Main_contractor, users, list
    p, Main_contractor, users, create
    p, Main_contractor, users, (list)|(edit)|(delete)

    p, Main_contractor, wa-comments, show
    p, Main_contractor, wa-comments, list
    p, Main_contractor, wa-comments, create
    p, Main_contractor, wa-comments, (list)|(edit)|(delete)

  `);
