import type { Schema, Attribute } from '@strapi/strapi';

export interface JobJobItem extends Schema.Component {
  collectionName: 'components_job_job_items';
  info: {
    displayName: 'job-item';
    icon: 'briefcase';
  };
  attributes: {
    Company: Attribute.String;
    title: Attribute.String;
    sendingDate: Attribute.Date;
    status: Attribute.Enumeration<['in progress', 'approved', 'rejected']> &
      Attribute.DefaultTo<'in progress'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'job.job-item': JobJobItem;
    }
  }
}
