
'use server'; // By adding the 'use server', you mark all the exported functions within the file as Server Actions. 
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { signIn } from '@/auth'; // my project's file
import { AuthError } from 'next-auth';


// This is temporary until @types/react-dom is updated
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};



// Form "schema" validation created with the help of zod library.
// NOTE: server-side validation with zod.
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer!',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});


const CreateInvoice = FormSchema.omit({ id: true, date: true });
// console.log("ye kiya hay  ", CreateInvoice);
// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });


// create invoice
export async function createInvoice(prevState: State, formData: FormData) {

  // Validate using Zod
  // console.log("formData", formData)
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // Test it out
  // console.log(validatedFields);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
  

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;

  // convert amount into cents
  const amountInCents = amount * 100;
  // creating new dates for invoices creation date
  const date = new Date().toISOString().split('T')[0];


  // console.log(typeof validatedFields.data.amount)


  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // Revalidate the cache for the invoices page 
  revalidatePath('/dashboard/invoices'); // trigger a new request
  redirect('/dashboard/invoices'); // redirect to the invoices page.
}


// update invoice
export async function updateInvoice(id: string, prevState: State, formData: FormData) {
  
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}


// delete invoice
export async function deleteInvoice(id: string) {
  // you can check error.tsx file for uncomment this below statement.
  // throw new Error('Failed to Delete Invoice'); 

  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return {
      message: 'Deleted Invoice',
    };
    
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Invoice',
    };
  }
}



// action for login form
export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', formData);
  } 
  catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}