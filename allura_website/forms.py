from django import forms
from django.db.models.fields import BooleanField

class ContactForm(forms.Form):
    name = forms.CharField(max_length=100)
    email = forms.EmailField()
    phone = forms.CharField(max_length=15)
    # subject = forms.CharField(max_length=100)
    message = forms.CharField(widget=forms.Textarea)
    terms = BooleanField("Consent given", default=False)
