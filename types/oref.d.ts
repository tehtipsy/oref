export type OrefAlert = {
  id: string;
  cat: string;
  title: string;
  data: string[];
  desc: string;
}

export type OrefAlertResponse = 'No Alert' | OrefAlert; 