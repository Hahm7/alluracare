# Allura Care

Company website for [Allura Care](https://www.alluracare.co.uk), a CQC-registered domiciliary home care provider. Built with Django, deployed on [Fly.io](https://fly.io).

## Why it's built this way

- **Django** — One Django app serves the templates, forms and static files.

- **Spam and privacy** — The contact form is gated against automated submissions. Maps load only after a click. Fonts and scripts are self-hosted so the public pages do not pull extra third-party trackers.

- **Fly.io + Docker** — The whole site ships with `fly deploy`. No server to patch by hand.

- **Config through environment variables** — No secrets in the repository. Production credentials live in Fly secrets.

## Local setup

Use a virtual environment. Do not commit `.env` files.

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Create `allura_project/.env` with at least:

```
SECRET_KEY=your-local-secret
DEBUG=True
```

Optional for the contact form: `GMAIL_USER_EMAIL`, `GMAIL_USER_PASSWORD`, `RECAPTCHA_PUBLIC_KEY`, `RECAPTCHA_PRIVATE_KEY`, `CONTACT_RECIPIENT_EMAIL`.

Leave `DATABASE_URL` unset locally so Django uses SQLite. Do not point local runs at the production database.

```bash
python manage.py migrate
python manage.py createcachetable
python manage.py runserver
```

Open http://127.0.0.1:8000/

## Deploy

```bash
fly deploy
```

Production secrets live in Fly (`fly secrets list`), not in the repo.

## Licence

Private company site. All rights reserved.
