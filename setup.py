from os.path import join, dirname

from setuptools import setup

here = dirname(__file__)

long_description = (open(join(here, "README.rst")).read() + "\n\n" +
                    open(join(here, "CHANGES.rst")).read() + "\n\n" +
                    open(join(here, "TODO.rst")).read())

def get_version():
    fh = open(join(here, "messages_ui", "__init__.py"))
    try:
        for line in fh.readlines():
            if line.startswith("__version__ ="):
                return line.split("=")[1].strip().strip('"')
    finally:
        fh.close()

setup(
    name="django-messages-ui",
    version=get_version(),
    description="JS and HTML to support the Django contrib.messages app",
    long_description=long_description,
    author="Jonny Gerig Meyer",
    author_email="jonny@oddbird.net",
    url="https://github.com/jgerigmeyer/django-messages-ui/",
    packages=["messages_ui"],
    package_data={
        "messages_ui": [
            "static/messages_ui/*.*",
            "templates/messages_ui/*.html",
            "jstemplates/*.html"
            ]
        },
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Environment :: Web Environment",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: BSD License",
        "Operating System :: OS Independent",
        "Programming Language :: Python",
        "Programming Language :: Python :: 2",
        "Programming Language :: Python :: 2.6",
        "Programming Language :: Python :: 2.7",
        "Framework :: Django",
    ],
    zip_safe=False,
)
