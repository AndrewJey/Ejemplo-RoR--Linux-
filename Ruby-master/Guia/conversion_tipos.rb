class ConversionTipos
  def initialize()

  end

  def convertStringInt(numeroTexo)
    numeroTexo = numeroTexo.to_i #EL METODO TO_I SE UTILIZA PARA CONVERTIR A UN NUMERO ENTERO
    return numeroTexo
  end

  def convertfloatToI(float)
    float = float.to_i
    return float
  end

  def converintFloat(int)
    int = int.to_f #El METODO TO_F SE UTILIZA PARA PASAR A UN VALOR CON DECIMALES
    return int
  end

  def convertCadena(numero)
    numero = numero.to_s #SE UTILIZA PARA CONVERTIR EN UNA CADENA DE TEXTO
    return numero
  end
end

metodos = ConversionTipos.new()
puts "PARA CONVERTIR UN NUMERO CON DECIMALES A ENTERO"
puts metodos.convertStringInt("12")
puts "PARA CONVERTIR UN NUMERO CON DECIMALES A ENTERO"
puts metodos.convertfloatToI(34.1231)
puts "PARA CONVERTIR UN NUMERO ENTERO A UNO CON DECIMALES"
puts metodos.converintFloat(123)
puts "PARA CONVERTIR UN NUMERO ENTERO O CUALQUIER OTRO OBJETO A UNA CADA DE TEXTO"
puts metodos.convertCadena(1200000) + " Mucho dinero"