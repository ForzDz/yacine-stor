import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', values);
    
    toast({
      title: "Message sent!",
      description: "Thank you for your message. We'll get back to you soon.",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      {/* Contact Section */}
      <section className="pt-20 pb-16 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Contact form */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                نحن هنا لمساعدتك
                </h1>
                <p className="text-xl text-gray-400 leading-relaxed">
                اي استفسارتواصل معنا وسنرد عليك فورا
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm font-medium">الاسم واللقب</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Yacine Dev" 
                            {...field} 
                            className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-emerald-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm font-medium"> البريد الإلكتروني</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="yacinemed2020@gmail.com" 
                            type="email"
                            {...field} 
                            className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-emerald-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm font-medium">رسالتك</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="أخبرنا كيف يمكننا مساعدتك"
                            className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-emerald-500 min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-all duration-200"
                  >
                    {isSubmitting ? 'Envoi...' : 'أرسل الرسالة'}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Right side - Testimonial card */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">Y</span>
                    </div>
                    <span className="text-white font-semibold text-lg">Yacine Dev</span>
                  </div>
                  
                  <blockquote className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-emerald-400 font-semibold">انخفاض تأخير المشروع بنسبة 30 ٪</span>لمزيد من المعلومات، لا تترددوا في الاتصال بنا بخصوص جودة منتجاتنا
                  </blockquote>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-400 font-semibold">Y</span>
                    <span className="text-red-500 font-semibold">a</span>
                    <span className="text-yellow-400 font-semibold">c</span>
                    <span className="text-blue-500 font-semibold">i</span>
                    <span className="text-blue-400 font-semibold">n</span>
                    <span className="text-yellow-400 font-semibold">e</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative gradient background */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
