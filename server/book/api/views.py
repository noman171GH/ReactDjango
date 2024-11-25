#from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Book
from .serializer import BookSerializer


@api_view(['GET'])
def get_books(request):
    books = Book.objects.all()
    serializedData = BookSerializer(books, many=True).data
    return Response(serializedData)

@api_view(['POST'])
def create_book(request):
    data = request.data

    title = data.get('title')
    release_year = data.get('release_year')
    
    if not title and not release_year:
        return Response({'detail': 'the title and the year is not provided'}, status=status.HTTP_400_BAD_REQUEST)

    if Book.objects.filter(title=title, release_year=release_year):
        return Response({'detail': 'Book already exist'}, status=status.HTTP_400_BAD_REQUEST)

    serializer = BookSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def book_detail(request, pk): #pk is "id" field of records
    try:
        book = Book.objects.get(pk=pk)  # mean , (model)table Book , Object (row(s)) where primarykey is = pk coming with request
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    #  Now we know we have Record , so we will check the method of request..

    if request.method == 'DELETE':
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        data = request.data
        serializer = BookSerializer(book, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)