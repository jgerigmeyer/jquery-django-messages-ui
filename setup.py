from os.path import join, dirname

from setuptools import setup

here = dirname(__file__)

long_description = (
    open(join(here, "README.rst")).read() + "\n\n" +
    open(join(here, "CHANGES.rst")).read()
    )

def get_version():
    fh = open(join(here, "django-messages-ui.jquery.json"))
    try:
        for line in fh.readlines():
            if line.startswith('  "version":'):
                return line.split(":")[1].strip().strip('",')
    finally:
        fh.close()

setup(
    name="django-messages-ui",
    version=get_version(),
    description="JS client-side messages plugin, with support for Django contrib.messages app",
    long_description=long_description,
    author="Jonny Gerig Meyer",
    author_email="jonny@oddbird.net",
    url="https://github.com/jgerigmeyer/jquery-django-messages-ui/",
    packages=["messages_ui"],
    package_data={
        "messages_ui": [
            "static/messages_ui/*.*",
            "templates/messages_ui/*.html",
            "jstemplates/*.html"
            ]
        },
    classifiers=[
        "Development Status :: 5 - Production/Stable",
        "Environment :: Web Environment",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python",
        "Programming Language :: Python :: 2",
        "Programming Language :: Python :: 2.6",
        "Programming Language :: Python :: 2.7",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.3",
        "Framework :: Django",
    ],
    zip_safe=False,
)
