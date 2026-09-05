from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='allura-home'),
    path('about/', views.about, name='allura-about'),
    path('services/', views.services, name='allura-services'),
    path('services/personal_care', views.personalCare, name='allura-services-personalCare'),
    path('services/medication', views.medication, name='allura-services-medication'),
    path('services/domestic', views.domestic, name='allura-services-domestic'),
    path('services/meal', views.meal, name='allura-services-meal'),
    path('services/reablement', views.reablement, name='allura-services-reablement'),
    path('services/respite', views.respite, name='allura-services-respite'),
    path('services/shopping', views.shopping, name='allura-services-shopping'),
    path('services/overnight', views.overnight, name='allura-services-overnight'),
    path('contact/', views.contact, name='allura-contact'),
    path('assessment/', views.assessment, name='allura-assessment'),
    path('asessment/quiz/', views.quiz, name='allura-assessment-quiz'),
    path('asessment/quiz/result', views.result, name='allura-assessment-quiz-result'),
]
