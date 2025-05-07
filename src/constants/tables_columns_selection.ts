// from this file table columns are set to display or hide based on user role. Selection happens in authProvider
// columns status are consumed in relevant files eg: proj - in project list, wa- work activity, user and contractor

const columnsControl = {
  proj_nr_users: false,
  proj_nr_contractors: false,
  wa_name: false,
  wa_contractor: false,
  wa_rev_exp: false,
  user_super: false,
  contracor_nr_users: false,
};

const columnsControlSet = {
  setCS() {
    columnsControl.proj_nr_users = false;
    columnsControl.proj_nr_contractors = true;
    columnsControl.wa_name = false;
    columnsControl.wa_contractor = true;
    columnsControl.wa_rev_exp = true;
  },

  setC() {
    columnsControl.proj_nr_users = true;
    columnsControl.proj_nr_contractors = true;
    columnsControl.wa_name = false;
    columnsControl.wa_contractor = true;
    columnsControl.wa_rev_exp = true;
  },

  setMCS() {
    columnsControl.proj_nr_users = true;
    columnsControl.proj_nr_contractors = false;
    columnsControl.wa_name = true;
    columnsControl.wa_contractor = false;
    columnsControl.wa_rev_exp = false;
    columnsControl.user_super = false;
    columnsControl.contracor_nr_users = false;
  },

  setMC() {
    columnsControl.proj_nr_users = true;
    columnsControl.proj_nr_contractors = false;
    columnsControl.wa_name = true;
    columnsControl.wa_contractor = false;
    columnsControl.wa_rev_exp = false;
    columnsControl.user_super = true;
    columnsControl.contracor_nr_users = true;
  },

  setAdmin() {
    columnsControl.proj_nr_users = false;
    columnsControl.proj_nr_contractors = false;
    columnsControl.wa_name = false;
    columnsControl.wa_contractor = false;
    columnsControl.wa_rev_exp = false;
    columnsControl.user_super = false;
    columnsControl.contracor_nr_users = false;
  },
};

export {columnsControl, columnsControlSet};
