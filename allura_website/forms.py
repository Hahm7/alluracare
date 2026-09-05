from django import forms
from captcha.fields import ReCaptchaField



class ContactForm(forms.Form):
    name = forms.CharField(
        max_length=100, min_length=2,
        error_messages={
            'required': 'Please enter your name.',
            'min_length': 'Please enter your full name (at least 2 characters).',
            'max_length': 'That name is too long (100 characters max).',
        },
    )
    email = forms.EmailField(
        error_messages={
            'required': 'Please enter your email address.',
            'invalid': 'Please enter a valid email address, e.g. name@example.com.',
        },
    )
    phone = forms.CharField(
        max_length=20, min_length=7,
        error_messages={
            'required': 'Please enter your phone number.',
            'min_length': 'Please enter a valid phone number (at least 7 digits).',
            'max_length': 'That phone number is too long.',
        },
    )
    message = forms.CharField(
        widget=forms.Textarea, min_length=10, max_length=2000,
        error_messages={
            'required': 'Please enter a message.',
            'min_length': 'Please give us a little more detail (at least 10 characters).',
            'max_length': 'Your message is too long (2000 characters max).',
        },
    )
    not_supplement = forms.BooleanField(
        required=True, label='I understand Allura Care is a home care provider and does not sell supplements or medication.',
        error_messages={
            'required': 'Please confirm you understand we are a home care provider, not a supplement seller.',
        },
    )
    terms = forms.BooleanField(
        required=True, label='Consent given',
        error_messages={
            'required': 'Please tick the box to consent to sharing your information.',
        },
    )
    captcha = ReCaptchaField(
        error_messages={
            'required': 'Please complete the reCAPTCHA to confirm you are human.',
        },
    )

    # Honeypot
    website = forms.CharField(
        required=False,
        widget=forms.TextInput(attrs={
            'autocomplete': 'off',
            'tabindex': '-1',
            'aria-hidden': 'true',
            'style': 'position:absolute; left:-9999px;',
        }),
    )

    def clean_website(self):
        if self.cleaned_data.get('website'):
            raise forms.ValidationError('Spam detected.')
        return ''
