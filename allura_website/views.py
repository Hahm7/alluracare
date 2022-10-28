from django.contrib import messages
from django.shortcuts import render
from .forms import ContactForm
from django.http import HttpResponseRedirect
# from .models import Contact
from django.core.mail import send_mail


def home(request):
    return render(request, 'allura_website/home.html')


def about(request):
    return render(request, 'allura_website/about.html', {'title': 'About'})


def services(request):
    return render(request, 'allura_website/service/services.html', {'title': 'Services'})


# services


def personalCare(request):
    return render(request, 'allura_website/service/services_pages/personal_care.html', {'title': 'Personal Care'})

def medication(request):
    return render(request, 'allura_website/service/services_pages/medication.html', {'title': 'Medication'})

def domestic(request):
    return render(request, 'allura_website/service/services_pages/domestic.html', {'title': 'Domestic'})

def meal(request):
    return render(request, 'allura_website/service/services_pages/meal.html', {'title': 'Meal'})

def reablement(request):
    return render(request, 'allura_website/service/services_pages/reablement.html', {'title': 'Reablement'})

def respite(request):
    return render(request, 'allura_website/service/services_pages/respite.html', {'title': 'Respite'})

def shopping(request):
    return render(request, 'allura_website/service/services_pages/shopping.html', {'title': 'Shopping'})

def overnight(request):
    return render(request, 'allura_website/service/services_pages/overnight.html', {'title': 'Overnight'})


# contact

def contact(request):

    # if request.method == "POST":
    #     contact = Contact(name = request.POST.get('name'), email = request.POST.get('email'),
    #                 phone = request.POST.get('phone'), subject = request.POST.get('subject'),
    #                     message = request.POST.get('message'))
    #     contact.save()

    #     messages.success(request, "Message sent successfully")
    #     return HttpResponseRedirect('/')

    if request.method == 'POST':
        form = ContactForm(request.POST)

        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        # subject = request.POST.get('subject')
        message = request.POST.get('message')
        terms = request.POST.get('terms')
        form_data = {
                'name':name,
                'message':message,
                'email':email,
                # 'subject': subject,
                'phone':phone,
                'terms':terms

        }
        message = '''
        From:\n\t\t{}\n
        Message:\n\t\t{}\n
        Email:\n\t\t{}\n
        Phone:\n\t\t{}\n
        '''.format(form_data['name'], form_data['message'], form_data['email'], form_data['phone'])
        send_mail('Allura Care Website Enquiry', message, '', ['hamdiahmed777@gmail.com']) # TODO: enter your email address



        if form.is_valid():
            print('the form was valid')

        # contact = Contact(name = request.POST.get('name'), email = request.POST.get('email'),
        #             phone = request.POST.get('phone'),
        #                 message = request.POST.get('message'))
        # contact.save()

        messages.success(request, "Message sent successfully")
        return HttpResponseRedirect('/contact')


    else:
        form = ContactForm()

    return render(request, 'allura_website/contact.html', {'title': 'Contact', 'form': form})






# quiz
def assessment(request):
    return render(request, 'allura_website/assessment/assessment.html', {'title': 'Assessment'})

def quiz(request):
    return render(request, 'allura_website/assessment/quiz/quiz.html', {'title': 'Quiz'})

def result(request):
    return render(request, 'allura_website/assessment/quiz/result.html', {'title': 'Result'})


# handling errors

def handler400(request, exception):
    return render(request, 'allura_website/400.html')

def handler403(request, exception):
    return render(request, 'allura_website/403.html')

def handler404(request, exception):
    return render(request, 'allura_website/404.html')

def handler500(request):
    return render(request, 'allura_website/500.html')



# Function to send the contact form to backend


# def contact_us(request):








