export interface IMail {
    to: string; 
    subject: string; 
    text: string; 
    html?: string;
}

export interface ITemplateMail {
    to: string,
    subject: string,
    templateName: string
}

export interface IUserCreationOrderConfirmTemplateMail extends ITemplateMail {
    name: string,
    order: Record<string, any>,
    shippingAddress: Record<string, any>,
    passwordResetLink: string
}

export interface IPwdResetTemplateMail extends ITemplateMail {
    passwordResetLink: string
}

export enum TemplateEnum {
    USER_CREATION_ORDER_MAIL = 'user-creation-order-mail',
    PWD_RESET_MAIL = 'pwd-reset-mail'
}