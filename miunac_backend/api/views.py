from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class LoginView(APIView):
    def post(self, request):
        codigo_unac = request.data.get("codigo_unac")
        password = request.data.get("password")

        user = authenticate(username=codigo_unac, password=password)

        if user is None:
            return Response({"detail": "Credenciales inválidas"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"detail": "Login exitoso"}, status=status.HTTP_200_OK)
