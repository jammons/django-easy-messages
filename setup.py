#!/usr/bin/env python

from setuptools import setup, find_packages


test_requirements = []

setup(
    name='django-easy-messages',
    version="0.1.0",
    description=('Simple plugin to get pretty messages with the django messages app'),
    author="Jeff Ammons",
    author_email="jeff@jeffammons.net",
    url='https://github.com/jammons/django-easy-messages',
    long_description=open('README.rst').read(),
    packages=find_packages(),
    requires=[
    ],
    zip_safe=False,
    tests_require=test_requirements,
    install_requires=[
    ] + test_requirements,
    classifiers=[
        'Environment :: Web Environment',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: BSD License',
        'Programming Language :: Python',
        'Topic :: Utilities',
    ],
    include_package_data=True,
)
