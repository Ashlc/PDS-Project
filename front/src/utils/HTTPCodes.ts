const HTTPCodes = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

const HTTPMessages = {
  BAD_REQUEST: 'Requisição inválida',
  UNAUTHORIZED: 'Você não tem permissão para acessar este recurso',
  FORBIDDEN: 'Acesso negado',
  NOT_FOUND: 'Não foi possível encontrar o recurso solicitado',
  UNPROCESSABLE_ENTITY: 'Entidade não processável',
  INTERNAL_SERVER_ERROR: 'Houve um erro interno no servidor',
  SERVICE_UNAVAILABLE: 'Serviço indisponível',
};

const getHTTPMessage = (code: number): string => {
  switch (code) {
    case HTTPCodes.BAD_REQUEST:
      return HTTPMessages.BAD_REQUEST;
    case HTTPCodes.UNAUTHORIZED:
      return HTTPMessages.UNAUTHORIZED;
    case HTTPCodes.FORBIDDEN:
      return HTTPMessages.FORBIDDEN;
    case HTTPCodes.NOT_FOUND:
      return HTTPMessages.NOT_FOUND;
    case HTTPCodes.UNPROCESSABLE_ENTITY:
      return HTTPMessages.UNPROCESSABLE_ENTITY;
    case HTTPCodes.INTERNAL_SERVER_ERROR:
      return HTTPMessages.INTERNAL_SERVER_ERROR;
    case HTTPCodes.SERVICE_UNAVAILABLE:
      return HTTPMessages.SERVICE_UNAVAILABLE;
    default:
      return '';
  }
};

export { HTTPCodes, HTTPMessages, getHTTPMessage };

