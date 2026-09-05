from django.conf import settings
from django.contrib import messages
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.core.mail import send_mail
from django_ratelimit.decorators import ratelimit
from .forms import ContactForm


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
@ratelimit(key='ip', rate='5/h', method='POST', block=True)
def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)

        if form.is_valid():
            cd = form.cleaned_data
            message = (
                "From:\n\t\t{name}\n\n"
                "Message:\n\t\t{message}\n\n"
                "Email:\n\t\t{email}\n\n"
                "Phone:\n\t\t{phone}\n"
            ).format(**cd)

            send_mail(
                'Allura Care Website Enquiry',
                message,
                settings.DEFAULT_FROM_EMAIL,
                [settings.CONTACT_RECIPIENT_EMAIL],
                fail_silently=False,
            )

            messages.success(request, "Message sent successfully")
            return HttpResponseRedirect('/contact')
        # invalid -> fall through and re-render with form.errors
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
    return render(request, 'allura_website/400.html', status=400)

def handler403(request, exception):
    return render(request, 'allura_website/403.html')

def handler404(request, exception):
    return render(request, 'allura_website/404.html')

def handler500(request):
    return render(request, 'allura_website/500.html')



# Function to send the contact form to backend


# def contact_us(request):








